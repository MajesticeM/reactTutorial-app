//Version 1: BookService
function BookService()
{
    //This will tie up all methods created below
    //The order is as follows:
        //1. ReceiveCustomerRequest()
        //2. OperationSlot()
        //3. TimedChat()
}

function ReceiveCustomerRequest()
{
    //This function should check in the database IF customer has made a booking to specific service provider
}

function TimedChat()
{
    //This function will run after service provider has approved operation
    //Chat should occur an hour before and after operation
}

function OperationSlot()
{
    //Thhis should display the progress of the service being rendered
}

export default BookService;