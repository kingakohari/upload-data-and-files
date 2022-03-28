const formComponent =`
    <form id="form">
        <input type="text" name="title">
        <input type="file" name="picture">
        <button>Send</button>
    </form>
`;

function loadEvent() {
 const rootElement = document.getElementById("root")

 rootElement.insertAdjacentHTML("beforeend", formComponent)

 const formElement = document.getElementById("form")
 formElement.addEventListener("submit", e => {
     e.preventDefault();
     
     const formData = new FormData()

     formData.append("title", e.target.querySelector(`input[name="title"]`).value)
     formData.append("picture", e.target.querySelector(`input[name="picture"]`).files[0])

     const fetchSettings = {
     fetch("/", {
         method: "POST",
         body: formData
     };

     fetch("/", fetchSettings)
        .then(data => {
            if (data.status === 200) {
                e.target.outerHTML = "Done";
                console.dir(data)
            }
        }) 
        .catch(error => {
            e.target.outerHTML = "Error";
            console.dir(error)
        }) 
    });
}

window.addEventListener("load", loadEvent)