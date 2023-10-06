import Filters from "./Filters";
import Breeds from "./Breeds";

function LeftColumn() {

    return (
        <div style={{ width: '25vw', height: '100dvh' }}>
            <Filters />
            <Breeds />
        </div>
    );
};

export default LeftColumn;