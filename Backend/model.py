from transformers import pipeline

class SentimentModel:
    def __init__(self):
        self.classifier = pipeline("sentiment-analysis")

    def predict(self, text):
        text = text.lower()

        # ✅ neutral logic
        if "average" in text or "okay" in text or "normal" in text:
            return "neutral", 1.0

        result = self.classifier(text)[0]

        label = result["label"]

        if label == "POSITIVE":
            return "positive", result["score"]
        else:
            return "negative", result["score"]