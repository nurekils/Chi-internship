from django.db import models


class Author(models.Model):
    name = models.CharField(max_length=30)
    email = models.EmailField(blank=True)
    bio = models.TextField(blank=True, max_length=500)

    def __str__(self):
        return f'{self.name} {self.email}'

class Book(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    published_date = models.DateField()

    def __str__(self):
        return self.title