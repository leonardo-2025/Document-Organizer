# GitHub Authentication & Push Instructions

Your repository is set up and ready to push! However, you need to authenticate with GitHub first.

## Step 1: Run the Push Command

Open your terminal and run:
```powershell
& "C:\Program Files\Git\cmd\git.exe" push -u origin main
```

## Step 2: Authenticate

When you run the command, you'll need to authenticate. Here are the options:

### Option A: Browser Authentication (Recommended)
- A browser window should open automatically
- Sign in to your GitHub account (leonardo-2025)
- Click "Authorize" when prompted
- The push will complete automatically

### Option B: Personal Access Token
If the browser doesn't open or you prefer using a token:

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Give it a name (e.g., "Doc Organizer")
4. Select the **`repo`** scope (full control of private repositories)
5. Click **"Generate token"**
6. **Copy the token** (you won't see it again!)
7. When prompted for password in terminal, **paste the token** (not your GitHub password)

## What Happens Next

Once authenticated, your code will be pushed to:
**https://github.com/leonardo-2025/Document-Organizer**

You can then view it on GitHub!

## Troubleshooting

If you get "Authentication failed":
- Make sure you're using the token as the password, not your GitHub password
- Make sure the token has `repo` permissions
- Try the browser authentication method instead
