from fastapi import APIRouter
from app.routers.users   import router as users_router
from app.routers.auth    import router as auth_router
from app.routers.boards  import router as boards_router
from app.routers.columns import router as columns_router
from app.routers.tasks   import router as tasks_router

api_router = APIRouter()
api_router.include_router(users_router)
api_router.include_router(auth_router)
api_router.include_router(boards_router)
api_router.include_router(columns_router)
api_router.include_router(tasks_router)
