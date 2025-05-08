from django.db import models

class Schedule(models.Model):
    time = models.DateTimeField()
    date = models.DateField()
    status = models.BooleanField(default=False)
    def __str__(self):
        return f"{self.date} at {self.time} - {'Completed' if self.status else 'Pending'}"


