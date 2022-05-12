import app from './app';


const PORT = 3003;


app.listen(PORT, ():void => {
    console.log(`Server running on port ${PORT}`);
});