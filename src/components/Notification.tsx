
const Notification = () => {
  return (
    <>
      <figure
        className="flex bg-slate-200 rounded-xl ml-3 mt-5 p-0 hover:cursor-pointer "
        onClick={() => {
          console.log("hi");
        }}
      >
        <img
          className="w-24 h-auto rounded-xl rounded-xl rounded-full "
          src={require("../pages/image/Coin.png")}
          alt="img"
          width="384"
          height="512"
        ></img>
        <div className="pt-2 p-2 text-left space-y-4">
          <blockquote>
            <p className=" font-medium">
              “New arrival proact called product x is comming soon 
                            
            </p>
          </blockquote>
        </div>
      </figure>
    </>
  );
}

export default Notification