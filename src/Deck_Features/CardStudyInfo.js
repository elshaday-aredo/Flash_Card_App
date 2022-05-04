function CardStudyInfo({card, front}) {

const side = front? "front" : "back"



  return (
    <p className="card-text">{card[side]}</p>
  )

};


export default CardStudyInfo;