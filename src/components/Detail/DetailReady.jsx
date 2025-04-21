import {React, useEffect} from "react";

const DetailReady = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);
    return(
        <section className="detailReady">
            <h2 className="detailReady__title">
            페이지 준비 중입니다. 
            </h2>
            <h3 className="detailReady__subtitle">
                현재 이 페이지를 개선하고 있습니다. 더 좋은 서비스로 찾아뵙겠습니다.   
            </h3>
        </section>
    )
}

export default DetailReady;