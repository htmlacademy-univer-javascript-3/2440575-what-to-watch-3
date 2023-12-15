
type ShowMoreBtnProps = {
    clickHandler: () => void;
  };
export const ShowMoreBtn = ({ clickHandler}: ShowMoreBtnProps) => (
  <div className="catalog__more">
    <button className="catalog__button" type="button" onClick={clickHandler} >Show more</button>
  </div>
);
