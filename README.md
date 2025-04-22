# shopping-ai-assistant
A chrome browser extension to show product recommendations using Gemini AI similar to the product being viewed on any site.
# Shopping Helper Extension Setup Guide

Follow these steps to set up and run the project locally:
## 1. Clone the Repository

1. First, clone the repository to your local machine:

```
git clone https://github.com/kumar-parth/shopping-ai-assistant.git
```

2. Navigate to the Project Directory

Once the repository is cloned, navigate into the project directory:

``` cd shopping-helper-extension/extension-ui ```

3. Install Dependencies
Make sure you are using Node.js version 18 or greater. If not, please update your Node.js version.

Then, install the required dependencies:

``` npm install ```


4. Build the Extension
Once dependencies are installed, create a production build of the extension:

``` npm run build ```

Note: This will generate the build files in the dist folder.

5. Copy the Build to the Main Directory
Next, copy the contents of the dist folder to the main project directory. You can do this with the following command:

``` cp -r dist ../. ```

6. Load the Extension in Chrome
Open Chrome and go to 

``` chrome://extensions/ ```

Enable Developer mode by toggling the switch in the top-right corner.
Click on the Load unpacked button.
Select the shopping-helper-extension directory and click Open.

7. Extension Activated
The extension is now active! You can browse to any eCommerce site, and on the product view page, you will see the "Ask Before Buying" button.

That's it! The extension should now be working locally. If you run into any issues, feel free to open an issue in the repository.


# Gemini API Key Setup Guide

Follow these steps to obtain your Gemini API key and integrate it into your application.

## Step 1: Create a Gemini Account

1. **Visit Gemini's website**: Go to the [Gemini website](https://aistudio.google.com/app/apikey).
2. **Sign up**: Click on "Get Started" or "Sign Up" to create a new account.
3. **Complete the registration process**: Fill in the necessary details like your email, username, password, and any additional security information required.
4. **Already Signed In**: Click on Create API Key.

## Step 2: Verify Your Account

1. After signing up, Gemini will send you a verification email.
2. Open the email and click on the verification link to confirm your email address.

## Step 3: Log In to Your Gemini Account

1. Once your email is verified, log in to your Gemini account using the credentials you created.

## Step 4: Access the API Section

1. **Navigate to the API page**: After logging in, go to the **Account** or **Settings** section, and look for an option labeled **API**.
2. **Create an API Key**: In the API section, you will find an option to create a new API key. Click the “Create New API Key” button.

## Step 5: Set Permissions for the API Key

1. When prompted, you'll need to specify the permissions for the API key. You can configure it for different levels of access, including:
   - **Read-only**: If you just need to read data.
   - **Trade**: If you need to execute trades.
   - **Withdraw**: If you need to perform withdrawals.
2. Select the appropriate permissions based on your use case.

> **Note**: For this extension, you can use Read-only permission.

## Step 6: Generate the API Key

1. After selecting the appropriate permissions, click "Create API Key".
2. Gemini will generate a new API key and a secret key.
3. **Copy your API key and secret**: Make sure to securely store both the **API key** and **API secret**. The secret will only be shown once, so keep it in a secure place.

> **Important**: Keep your API secret private! Never expose it in client-side code or share it publicly.


## Screenshots

1. Assistant UI in browser

![image](https://github.com/user-attachments/assets/2c72b46e-e9e6-40e0-a270-52b71592bcac)

2. Use the API key to paste in the prompt asked by the assistant in the following screenshot.

![image](https://github.com/user-attachments/assets/41ff92b3-47cf-406b-aaf4-145025ab52e6)

3. Assistant will ask a few questions.

![image](https://github.com/user-attachments/assets/8fb32b4b-47bc-46c2-b7d1-421eba9cff22)

4. Assistant will provide AI suggested product recommendation links from different google links.

![image](https://github.com/user-attachments/assets/2d1fe5c2-d2cf-4e11-a94f-edfeda766ea0)