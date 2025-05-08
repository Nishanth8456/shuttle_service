from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('logout/', views.logout_view, name='logout'),
    path('ajax-login/', views.ajax_login, name='ajax_login'),
    path('ajax-signup/', views.ajax_signup, name='ajax_signup'),
]

