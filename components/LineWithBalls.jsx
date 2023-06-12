const LineWithBalls = ({ ball1Position, ball2Position }) => {

    console.log(ball1Position, ball2Position)
  return (
      <div className='relative w-full h-0.5 bg-[#DBDBDB]'>
        <div className="absolute -top-[10px] w-5 h-5 rounded-full bg-[#DBDBDB]" style={{left: ball1Position }}></div>
        <div className="absolute -top-[10px] w-5 h-5 rounded-full bg-[#DBDBDB]" style={{left: ball2Position }}></div>
      </div>
  );
};

export default LineWithBalls
