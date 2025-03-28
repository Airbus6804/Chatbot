from .success import successResponse
def tokenResponse(token:str):
    return successResponse({'token': token})