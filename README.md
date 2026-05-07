# BoardGenie

# How to run the program

**Requirements:** Node.js v18 or higher

**1. Install dependencies**
npm install

**2. Start the development server**
npm run dev

**3. Open in browser**
http://localhost:5173

-----------------------------------------------------------------

# Overview and conclusion of the project 

Overall, building BoardGenie was a challenging but fun experience. The original concept came directly from a problem that i personally face which is spending too long deciding what board game to play with friends. So, i ran a survey with 19 respondents to validate this idea, and the results confirmed that 92% of people struggle with this same problem, which gave me confidence to move forward.

And talking about the most difficult part of this project i faced was API integration. In my proposal, I proposed using the BoardGameGeek (BGG) or Board Game Atlas APIs to access live game statistics. But during development, I came to know that Board Game Atlas had shut down their service in 2022. I then attempted to utilize the BGG XML API directly, but encountered CORS (Cross-Origin Resource Sharing) issues. CORS is a browser security feature that prevents requests to external servers that have not been expressly approved. I then tested several other CORS proxy solutions, including corsproxy.io, allorigins.win, and thingproxy, but they all either returned 401 Unauthorized errors or were taken offline.

So, in order to move forward i began searching for alternatives. After some research, I found the Open Library API by the Internet Archive which is a completely free, open JSON API with full CORS support and no API key is required for it. **So i decided to add new feature on my project which i didn't mentioned on proposal earlier that is i decided to add game guide features**. So, I integrated this API into the Game Finder page to provide a live book search feature, where users can search for real books about board games, strategy and game design. This satisfies the external API requirement from the brief and demonstrates my ability to adapt when original plans are not feasible. And as of games I used a selected dataset of 20 real board games with accurate ratings, descriptions, and player counts from BoardGameGeek to create the game card data.

