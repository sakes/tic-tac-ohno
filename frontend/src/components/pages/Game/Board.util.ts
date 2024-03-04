export const computeBorderStyle = (row, col) => {
    let style = "";
    switch (row) {
      case 0:
        style += " mb-3";
        break;
      case 1:
        style += "";
        break;
      case 2:
        style += " mt-3";
        break;
      default:
        // do nothing
        break;
    }
    switch (col) {
      case 0:
        style += " mr-3";
        break;
      case 1:
        style += " m-x-3";
        break;
      case 2:
        style += " ml-3";
        break;
      default:
        // do nothing
        break;
    }
    return style;
  };
