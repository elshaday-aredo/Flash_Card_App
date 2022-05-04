

function NextCardBtn({front, handleNextClick}){

if(!front){
  return (
    <button onClick={handleNextClick} className="btn btn-primary mr-5">Next</button>
  ) 
} else {
  return null;
}


}


export default NextCardBtn