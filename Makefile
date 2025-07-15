.PHONY: dev up down build

# รันทั้ง client + server + db ด้วย docker-compose
dev:
	docker-compose up --build

# สั่งหยุด
down:
	docker-compose down

# build images เท่านั้น
build:
	docker-compose build

# รันแยกแต่ละฝั่ง (local without Docker)
client-dev:
	cd client && npm install && npm run dev

server-dev:
	cd server && python3 -m venv venv && \
	. venv/bin/activate && \
	pip install -r requirements.txt && \
	uvicorn app.main:app --reload
