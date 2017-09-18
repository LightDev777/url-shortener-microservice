<h1>FreeCodeCamp API Basejump: URL Shortener Microservice</h1>
<h2>User stories:</h2>

<ul>
<li>I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.</li>
<li>When I visit that shortened URL, it will redirect me to my original link.</li>
</ul>

<h2>Example creation usage:</h2>
<code>https://short-url-serv.herokuapp.com/new/https://www.google.com</code><br>
<code>https://short-url-serv.herokuapp.com/new/http://foo.com:80</code><br>
<h2>Example creation output</h2>
<code>{ "original_url":"https://www.google.com", "short_url":"https://short-url-serv.herokuapp.com/W29S0" }</code>
<h2>Usage:</h2>
<code>https://short-url-serv.herokuapp.com/W29S0</code>
<h2>Will redirect to:</h2>
<code>https://www.google.com/</code>

<h3>Coded by: Charmie Q.</h3>
