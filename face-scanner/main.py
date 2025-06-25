# face-scanner/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import cv2, requests, threading
from ultralytics import YOLO
import supervision as sv
from datetime import datetime

app = FastAPI()
origins = [
    "http://localhost:5173/",
    "http://localhost:3001/",
    "http://localhost:8000/"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = YOLO("yolov8n.pt")
camera_active = False
cap = None

def run_camera():
    global camera_active, cap
    cap = cv2.VideoCapture(0)
    # known_students = {
    #     # student_code: image_path
    #     "S12345": "images/nont.jpg",
    #     "S23456": "images/jane.jpg"
    # }

    while camera_active:
        ret, frame = cap.read()
        if not ret: continue

        results = model(frame, verbose=False)[0]
        detections = sv.Detections.from_ultralytics(results)

        for box in detections.xyxy:
            x1, y1, x2, y2 = map(int, box)
            cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
            
            # สำหรับทดสอบ: สุ่มส่ง student_code
            requests.post("http://localhost:3001/attendance", json={
                "student_code": "S12345",
                "timestamp": datetime.now().isoformat(),
                "status": "present"
            })

        cv2.imshow("YOLOv8 Face Scan", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'): break

    cap.release()
    cv2.destroyAllWindows()

@app.post("/start-camera")
def start_camera():
    global camera_active
    if not camera_active:
        camera_active = True
        threading.Thread(target=run_camera).start()
        return {"message": "Camera started"}
    return {"message": "Camera already running"}

@app.post("/stop-camera")
def stop_camera():
    global camera_active
    camera_active = False
    return {"message": "Camera stopped"}