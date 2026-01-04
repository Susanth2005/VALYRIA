@echo off
setlocal
echo ==========================================
echo      VALYRIA DEPLOYMENT PROTOCOL
echo ==========================================
echo.
echo Initializing Git repository...
git init
git add .
git commit -m "Initialize Valyria Singularity"
git branch -M main

echo.
echo ==========================================
echo ENTER YOUR GITHUB REPOSITORY URL BELOW
echo (e.g., https://github.com/username/valyria.git)
echo ==========================================
set /p repo_url="Repository URL: "

if "%repo_url%"=="" goto error

echo.
echo Linking remote origin...
git remote add origin %repo_url%

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo ==========================================
echo      DEPLOYMENT SEQUENCE COMPLETE
echo ==========================================
echo.
echo Now go to your GitHub Repository Settings -> Pages
echo and select 'main' branch / root folder.
pause
exit /b

:error
echo.
echo Error: No URL provided. Aborting sequence.
pause
