type MyListBtnProps = {
    isFavorite: boolean;
  };
export const MyListBtn = ({isFavorite}: MyListBtnProps): JSX.Element => (
  isFavorite ? (
    <svg
      viewBox="0 0 18 14"
      width="18"
      height="14"
    >
      <use xlinkHref="#in-list"></use>
    </svg>
  ) : (
    <svg
      viewBox="0 0 19 20"
      width="19"
      height="20"
    >
      <use xlinkHref="#add"></use>
    </svg>
  )
);

