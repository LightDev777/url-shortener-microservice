<h1>FreeCodeCamp API Basejump: URL Shortener Microservice</h1>
<h2>User stories:</h2>

<ul>
<li>I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.</li>
<li>When I visit that shortened URL, it will redirect me to my original link.</li>
<ul>

<h2>Example creation usage:</h2>
<code>https://url-shortener-microservice.herokuapp.com/new/https://www.google.com</code>
<code>https://url-shortener-microservice.herokuapp.com/new/http://foo.com:80</code>
Example creation output
<code>{ "original_url":"http://foo.com:80", "short_url":"https://url-shortener-microservice.herokuapp.com/8170" }</code>
<h2>Usage:</h2>
<code>https://url-shortener-microservice.herokuapp.com/2871</code>
<p>Will redirect to:</p>
<code>https://www.google.com/</code>
