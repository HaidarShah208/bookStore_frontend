import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import instance from '../../utils/instance';
// import { ShoppingBag, Visa, CreditCard } from 'lucide-react';

const CheckoutForm = ({allBooks,total,orderPlaced,loading}) => {
    const [profile, setProfile] = useState("");
    const shippingFee = 350;
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await instance.get("/see");
        setProfile(response.data.user);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);
  const finalTotal = allBooks.length > 0 ? total + shippingFee : total;

  return (
    <div className="bg-gradient-to-b bg-zinc-700 to-white rounded-3xl shadow-lg w-[375px] h-auto overflow-auto p-4 md:p-8">
      <form className="grid gap-8" onSubmit={orderPlaced}>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Address</h2>
          <div className="bg-zinc-600 text-white p-4 rounded-lg">
            <address className="not-italic text-white">
              {profile.username}<br />
              {profile.address}
            </address>
          </div>
        </div>

        <fieldset>
          {/* <legend className="font-semibold mb-2">Payment Method</legend> */}
          <div className="grid gap-4">
            {[
            //   { id: 'visa', label: 'Visa Payment', icon: <Visa className="w-6 h-6" /> },
            //   { id: 'paypal', label: 'PayPal', icon: <Paypal className="w-6 h-6" /> },
            //   { id: 'mastercard', label: 'Master Card', icon: <CreditCard className="w-6 h-6" /> },
            ].map(({ id, label, icon }) => (
              <div key={id} className="flex items-center bg-white rounded-lg shadow-sm p-4">
                <input
                  type="radio"
                  id={id}
                  name="payment-method"
                  className="mr-4 accent-red-500"
                  defaultChecked={id === 'visa'}
                />
                <label htmlFor={id} className="flex items-center flex-1 gap-4">
                  {icon}
                  {label}
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Shopping Bill</h2>
          <table className="w-full">
            <tbody className="text-gray-500">
              <tr>
                <td className="py-1 text-white">Shipping fee</td>
                <td className="text-right text-white py-1">Rs. 350</td>
              </tr>
              <tr>
                <td className="py-1 text-white">All Books</td>
                <td className="text-right text-white py-1">{allBooks.length}</td>
              </tr>
              <tr>
                <td className="py-1 text-white">Price Total</td>
                <td className="text-right text-white py-1">Rs. {total}</td>
              </tr>
            </tbody>
            <tfoot className="border-t border-gray-400 font-semibold">
              <tr>
                <td className="py-1 text-white">Total</td>
                <td className="text-right text-white py-1">Rs. {finalTotal}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-zinc-200 hover:bg-zinc-400 text-black rounded-full py-3 px-4 flex items-center justify-center gap-2 transition duration-300"
          >
            {/* <ShoppingBag className="w-5 h-5" /> */}
           {loading? 'Ordering...':' Buy Now'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;