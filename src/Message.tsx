///This is a react component
function Message()
{
    const name='Mashudu';
    if(name)
        {
            //Render an H1 element
            return <h1>Hello {name}</h1>
        }
        else
        {
            return <h1>Hello World!</h1>
        }
   
}

export default Message;