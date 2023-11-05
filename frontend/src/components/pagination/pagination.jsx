import './pagination.css'
const Pagination = ({ pages, currentPage, setCurrentpage }) => {

    let generatedPages = [];
    for (let i = 1; i <= pages; i++) {
        console.log(i);
        generatedPages.push(i);
        console.log(generatedPages)

    }
    return (


        <div className="pagination">
            <button  className="page previous"
                onClick={()=>setCurrentpage(prev=>prev-1)}
            >Previous</button>
            {generatedPages.map(page => (
                <div onClick={() => setCurrentpage(page)} className={currentPage === page ? "page active" : "page"} key={page}>
                    {page}
                </div>
            ))}
            <div className="page next">Next</div>
        </div>
    );
}

export default Pagination; 