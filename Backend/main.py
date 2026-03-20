from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import database

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputText(BaseModel):
    text: str
    suggestion: str = ""
    rating: int = 0


@app.get("/")
def home():
    return {"message": "API running 🚀"}


@app.post("/predict")
def predict(data: InputText):
    text = data.text.lower()

    positive_words = ["good", "excellent", "great", "happy"]
    negative_words = ["bad", "worst", "poor", "angry"]

    sentiment = "neutral"

    if "not" in text and any(word in text for word in positive_words):
        sentiment = "negative"
    elif any(word in text for word in negative_words):
        sentiment = "negative"
    elif any(word in text for word in positive_words):
        sentiment = "positive"

    database.add_feedback({
        "text": data.text,
        "sentiment": sentiment,
        "suggestion": data.suggestion,
        "rating": data.rating
    })

    return {"sentiment": sentiment}


@app.get("/feedback")
def feedback():
    return database.get_feedback()


@app.get("/analytics")
def analytics():
    data = database.get_feedback()
    result = {"positive": 0, "negative": 0, "neutral": 0}

    for item in data:
        sentiment = item["sentiment"]
        if sentiment in result:
            result[sentiment] += 1

    return result


@app.delete("/feedback/{index}")
def delete(index: int):
    return database.delete_feedback(index)