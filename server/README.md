# 📋 Kanban Board Backend

FastAPI backend สำหรับระบบจัดการงานแบบ Kanban Board พร้อม Authentication และ JWT

## 🔧 การตั้งค่าเริ่มต้น

### 1. สร้าง Virtual Environment ด้วย Python 3.13

```bash
py -3.13 -m venv .venv

```

### 2. เปิดใช้งาน Virtual Environment

```bash
.\.venv\Scripts\activate.bat

```

### 3. เริ่มต้นโปรเจกต์ด้วย Poetry

```bash
poetry init --no-interaction

```

### 4. ตั้งค่า Poetry Configuration

```bash
# ตั้งค่าให้ Poetry เก็บ venv ในโฟลเดอร์โปรเจกต์
poetry config virtualenvs.in-project true

# บอก Poetry ให้ใช้ Python ใน .venv
poetry env use .venv\Scripts\python.exe

```

### 5. ติดตั้งไลบรารีหลัก

```bash
poetry add fastapi uvicorn python-jose passlib[bcrypt] pydantic

```

### 6. ติดตั้งไลบรารีสำหรับพัฒนา

```bash
poetry add --dev pytest httpx

```

## 🚀 การรันโปรเจกต์

### ตรวจสอบ Environment และแพ็กเกจ

```bash
poetry env info
poetry show

```

### รันเซิร์ฟเวอร์ FastAPI

```bash
poetry run uvicorn app.main:app --reload

```

## 📁 โครงสร้างโปรเจกต์

```
server/
│
├── 📁 .venv/                # Virtual Environment
│
├── 📁 app/                  # โฟลเดอร์สำหรับโค้ด Backend
│   ├── 📁 __pycache__/      # Python Cache Files
│   ├── 📁 core/             # Core Components
│   ├── 📁 models/           # Database Models
│   ├── 📁 routers/          # API Routes
│   ├── 📁 schemas/          # Pydantic Schemas
│   ├── 🐍 __init__.py       # Python Package
│   ├── 🗄️ database.py       # Database Connection
│   └── 🚀 main.py           # จุดเริ่มต้นของแอป FastAPI
│
├── 📁 scripts/              # Scripts สำหรับ Automation
│   └── 📄 .env              # Environment Variables
│
├── 🔒 .gitignore            # Git Ignore Rules
├── 🐳 Dockerfile            # Docker Configuration
├── 🔐 poetry.lock           # Lock Dependencies
├── 📦 pyproject.toml        # Poetry Configuration
├── 📄 README.md             # Documentation
└── 📋 requirements.txt      # Dependencies List

```

## 🚀 คำสั่งที่ใช้บ่อย

คำสั่ง

คำอธิบาย

`poetry shell`

เปิด virtual environment

`poetry add [package]`

ติดตั้งแพ็กเกจใหม่

`poetry add --dev [package]`

ติดตั้งแพ็กเกจสำหรับพัฒนา

`poetry remove [package]`

ถอนการติดตั้งแพ็กเกจ

`poetry install`

ติดตั้งแพ็กเกจทั้งหมดจาก lock file

`poetry show`

แสดงรายการแพ็กเกจที่ติดตั้ง

`poetry run uvicorn app.main:app --reload`

รันเซิร์ฟเวอร์

`poetry run pytest`

รันการทดสอบ

## 🔑 Features

-   ✅ **Authentication:** JWT Token-based authentication
-   ✅ **Password Security:** BCrypt password hashing
-   ✅ **API Documentation:** Swagger UI และ ReDoc
-   ✅ **Testing:** pytest สำหรับการทดสอบ
-   ✅ **Dependency Management:** Poetry
-   ✅ **Fast Development:** Auto-reload ด้วย uvicorn

## 📖 API Documentation

🌐 **เซิร์ฟเวอร์รันที่:** `http://localhost:8000`

-   **Swagger UI:** `http://localhost:8000/docs`
-   **ReDoc:** `http://localhost:8000/redoc`

## 🧪 การทดสอบ

```bash
# รันการทดสอบทั้งหมด
poetry run pytest

# รันการทดสอบแบบ verbose
poetry run pytest -v

# รันการทดสอบพร้อมดูการครอบคลุม
poetry run pytest --cov=app

```

## 🔧 Environment Variables

สร้างไฟล์ `.env` ในโฟลเดอร์รูท:

```env
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DATABASE_URL=sqlite:///./kanban.db

```

## 🏗️ การพัฒนาต่อ

1.  **เพิ่มไลบรารี:** `poetry add [package-name]`
2.  **สร้าง Migration:** ตั้งค่า Alembic สำหรับ database migrations
3.  **เพิ่มการทดสอบ:** เขียนทดสอบใน `tests/` directory
4.  **Deploy:** ใช้ Docker หรือ cloud services

----------

✅ **พร้อมใช้งาน!** สามารถเริ่มพัฒนา Kanban Board API ได้เลย 🎉