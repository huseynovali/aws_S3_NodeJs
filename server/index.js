const express = require("express")
const { uploadFile, getFile } = require("./s3")
const cors = require('cors');
const app = express()
const multer = require("multer")
const upload = multer({ dest: "upload/" })

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: 'GET,POST', 
    allowedHeaders: 'Content-Type,Authorization', 
}))




app.post("/images", upload.single("image"), async (req, res) => {
    const file = req.file;
    const response = await uploadFile(file);
    res.json(response)
    console.log(response);
})

app.get("/images/:key", (req, res) => {
    const Key = req.params.key;
    const result = getFile(Key)
    result.pipe(res)

})


app.listen(8080, () => console.log("server runing !!!"))