import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Images } from "../../../../assets/assets";
import { Link } from "react-router-dom";
import { fetchCart, removeFromCart } from "../../../../redux/cart/cartActions";
import { useDispatch, useSelector } from "react-redux";
import ConfirmPopup from "../../Common/popup/confirmation";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);
  const [showModal, setShowModal] = useState(false);
  const [itemIdToRemove, setItemIdToRemove] = useState(null);

  const handleRemoveToCart = async () => {
    const res = await dispatch(
      removeFromCart(itemIdToRemove, user?.data?.accessToken)
    );
    if (res) {
      dispatch(fetchCart(user?.data?.accessToken));
    }
    setShowModal(false); // Close the modal after the action is done
  };

  const openConfirmModal = (id) => {
    setItemIdToRemove(id);
    setShowModal(true);
  };

  return (
    <div className="cart-wizard-area">
      <div className="image">
        <img
          src={item?.image || Images.moreCourse3}
          className="img-fluid"
          alt="img"
        />
      </div>
      <div className="text">
        <h6>
          <a href={`/courses-detail/${item?.id}`}>{item?.title_en}</a>
        </h6>
        <p>
          By <a href="#">{item?.instructor}</a>
        </p>
        <div className="bottom-wizard d-flex justify-content-between align-items-center">
          <p>
            ${item?.price}{" "}
            <span>
              <del>${item?.old_price}</del>
            </span>
          </p>
          <div className="trash-icon">
            <Link to="#" onClick={() => openConfirmModal(item?.id)}>
              <FontAwesomeIcon className="text-red" icon={faTrash} />
            </Link>
          </div>
        </div>
      </div>

      <ConfirmPopup
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleRemoveToCart}
      />
    </div>
  );
};

export default CartItem;
