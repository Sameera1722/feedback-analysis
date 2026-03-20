feedback_db = []

def add_feedback(data):
    print("Saving:", data)  # 🔥 DEBUG
    feedback_db.append(data)
    return data

def get_feedback():
    print("All Data:", feedback_db)  # 🔥 DEBUG
    return feedback_db

def delete_feedback(index):
    if index < len(feedback_db):
        return feedback_db.pop(index)
    return None