FROM python:3.10-slim
WORKDIR /bot
COPY . .
RUN pip install pymongo python-telegram-bot
CMD ["python", "leak_alert_bot.py"]
