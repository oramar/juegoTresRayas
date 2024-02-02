const Square = ({value, onSquareClick, highlight}) => {

  const style = highlight ? { backgroundColor: 'limegreen' } : {};
  
  return (
    <>
    <div className="button">
    <button className="square" onClick={onSquareClick} style={style}>
        {value}
      </button>    
    </div>
    </>
  );
};

export default Square;
