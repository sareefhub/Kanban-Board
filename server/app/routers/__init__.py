# app/routers/__init__.py
from fastapi import APIRouter

from .auth_router           import router as auth_router
from .users_router          import router as users_router
from .boards_router         import router as boards_router
from .board_members_router  import router as board_members_router
from .columns_router        import router as columns_router
from .tasks_router          import router as tasks_router
from .task_assignees_router import router as task_assignees_router
from .tags_router           import router as tags_router
from .notifications_router  import router as notifications_router

api_router = APIRouter()
api_router.include_router(auth_router)
api_router.include_router(users_router)
api_router.include_router(boards_router)
api_router.include_router(board_members_router)
api_router.include_router(columns_router)
api_router.include_router(tasks_router)
api_router.include_router(task_assignees_router)
api_router.include_router(tags_router)
api_router.include_router(notifications_router)
