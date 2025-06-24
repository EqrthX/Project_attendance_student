# Student Monitoring with YOLOv8 + React + Express

โปรเจคตรวจจับการตั้งใจเรียนของนักศึกษาแบบเรียลไทม์ผ่านกล้อง
- YOLOv8 + Express (backend)
- React + Recharts (frontend)

## วิธีใช้งาน
uvicorn app:ชื่อไฟล์ที่รัน --reload

### Backend
```bash
cd face-scanner
python -m venv yolov11_env
source yolov11_env/bin/activate
pip install -r requirements.txt
python app.py
