const imageForm = document.querySelector("#imageForm")
const imageInput = document.querySelector("#imageInput")

imageForm.addEventListener("submit", async event => {
    event.preventDefault()
    const file = imageInput.files[0]

    //get secure url from our server
    const {url} = await fetch("/s3Url").then(res=>res.json())
    console.log(url)
    //post the image directly to s3 buckets

    //post request to my server to grab image
})