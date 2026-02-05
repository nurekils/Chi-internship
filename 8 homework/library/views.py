from django.shortcuts import render, get_object_or_404
from .models import Author, Book
from django.db.models import Count

def authors (request):
    return render(request, '', {})

def home (request):
    return render(request, 'index.html', {})

def authors(request):
    authors = Author.objects.annotate(
        books_count=Count("book")
    )

    return render(request, "authors.html", {
        "authors": authors
    })


def books(request):
    query = request.GET.get("q")
    books = Book.objects.select_related("author")

    if query:
        books = books.filter(title__icontains=query)

    books = books.order_by("-published_date")
    return render(request, "books.html", {
        "books": books,
        "query": query,
    })

def author_books(request, id):
    author = get_object_or_404(Author, id=id)
    books = Book.objects.filter(author=author).order_by("-published_date")

    return render(request, "author_books.html", {
        "author": author,
        "books": books,
    })