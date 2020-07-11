

function shortener() {
    const input_url = document.getElementById("shortenit").value

    // POST request using fetch() 
    fetch("https://rel.ink/api/links/", {

        // Adding method type 
        method: "POST",

        // Adding body or contents to send 
        body: JSON.stringify({
            url: input_url
        }),

        // Adding headers to the request 
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

        // Converting to JSON 
        .then(response => response.json())

        // Displaying results to console 
        .then(json =>

            // GET request using fetch()
            fetch(`https://rel.ink/api/links/${json.hashid}`)

                // Converting received data to JSON 
                .then(response => response.json())
                .then(json => {

                    // Create a variable to store HTML 
                    let link = ``;

                    if(json.hashid == undefined){
                        alert('Invalid URL: use this format: https://www.example.com');
                        console.log("invalid url")
                    }
                    else{
                        link += `<p id="output" style="font-weight=bold;">
                        https://rel.ink/${json.hashid}
                       	 
                        </p>
                        <button id="copy" onclick="copy()">Copy</button>`;
                        console.log(json)

                        // Display result 
                        document.getElementById("display").innerHTML = link;
                    }
                    
                })
                .catch((error) => {
                    console.error('Error:', error);
                  }) 
        )

        .catch((error) => {
            console.error('Error:', error);
          }) 
        
}

//copy text function
function copy() {
    var copyText = document.getElementById("output");
    var range = document.createRange();
    var selection = window.getSelection();
    range.selectNodeContents(copyText);
    
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
  }
  
