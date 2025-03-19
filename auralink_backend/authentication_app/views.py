# authentication_app/views.py
from django.shortcuts import render,redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.conf import settings
import urllib.parse
from django.contrib.auth import  login


FRONTEND_BASE_URL = settings.FRONTEND_HOME


@login_required
def profile_view(request):
    print('profile_view....')
    print('profile_view....')
    print('profile_view....')
    user = request.user
    profile = user.profile
    
    # Return JSON response for API or render template based on Accept header
    if request.headers.get('Accept') == 'application/json':
        return JsonResponse({
            'username': user.username,
            'email': user.email,
            'display_name': profile.display_name,
            'avatar_url': profile.avatar_url,
        })
    else:
        # For browser requests, you might want to redirect to frontend
        return render(request, 'profile.html', {
            'user': user,
            'profile': profile
        })
    
from django.middleware.csrf import get_token

def get_csrf_token(request):
    print('csrf token....')
    print('request===========',request.user)
    csrf_token = get_token(request)
    print(csrf_token)
    print('csrf token....')
    return JsonResponse({"csrfToken": csrf_token})

def redirect_to_frontend(request):
    print('redirect_to_frontend================')
    print(request.user)
    print('redirect_to_frontend================')
  
    # Only proceed if user is authenticated
    if request.user.is_authenticated:
        user = request.user
        # login(request, user)

        try:
            # Update profile from social account data if available
            if hasattr(user, 'socialaccount_set') and user.socialaccount_set.exists():
                social_account = user.socialaccount_set.first()
                data = social_account.extra_data
                profile = user.profile
                
                # For Google
                if social_account.provider == 'google':
                    if 'picture' in data:
                        profile.avatar_url = data['picture']
                    if 'name' in data:
                        profile.display_name = data['name']
                    profile.save()

                # For Microsoft
                elif social_account.provider == 'microsoft':
                    if 'displayName' in data:
                        profile.display_name = data['displayName']
                    profile.save()
            
            profile = user.profile
            avatar_url = profile.avatar_url if profile.avatar_url else ""
            display_name = profile.display_name if profile.display_name else user.username
            
            # Option 1: Using URL parameters
            user_data = {
                'username': user.username,
                'email': user.email,
                'display_name': display_name,
                'avatar_url': avatar_url,
                'authenticated': 'true'
            }
            print('=================')
            print(user_data)
            query_string = urllib.parse.urlencode(user_data)
            frontend_url = f"{settings.FRONTEND_HOME}?{query_string}"
            print(query_string,frontend_url,'kkkkkkkkkkkkkkkk')
            return redirect(frontend_url)
        except Exception as e:
            print(f"Error preparing user data: {e}")
    
    # Fallback for unauthenticated users or errors
    return redirect(f"{settings.FRONTEND_HOME}?authenticated=false")



from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# @csrf_exempt
def test_cors(request):
    print('===========sdfdsf====')
    """Simple view to test CORS without CSRF interference"""
    return JsonResponse({
        "message": "CORS test successful",
        "method": request.method,
        "received_data": request.headers.get('X-Test-Header', 'No test header sent')
    })

