# authentication_app/signals.py
from allauth.socialaccount.signals import social_account_updated, pre_social_login
from django.dispatch import receiver
from .models import UserProfile

@receiver(pre_social_login)
def update_user_profile_on_login(request, sociallogin, **kwargs):
    user = sociallogin.user
    print("update_user_profile_on_login",user)
    if not hasattr(user, 'profile'):
        UserProfile.objects.create(user=user)
    
    profile = user.profile
    
    # For Google
    if sociallogin.account.provider == 'google':
        data = sociallogin.account.extra_data
        if 'picture' in data:
            profile.avatar_url = data['picture']
        if 'name' in data:
            profile.display_name = data['name']
    
    # For Microsoft
    elif sociallogin.account.provider == 'microsoft':
        data = sociallogin.account.extra_data
        if 'displayName' in data:
            profile.display_name = data['displayName']
    
    profile.save()