import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const ItemDetails = () => {
  const { id } = useParams(); // Get the item ID from the URL
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        console.log(`Fetching details from: http://localhost:4000/api/items/${id}`);
        const response = await axios.get(`http://localhost:4000/api/items/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setItem(response.data);
      } catch (err) {
        console.error("Error fetching item details", err);
        setError("Failed to load item details.");
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading item details...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    // 
    <div className="min-h-screen bg-gray-50"> {/* Added pt-16 for spacing */}

      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10 pt-20">
        <h1 className="text-3xl font-bold text-gray-800">{item.title}</h1>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-80 object-cover rounded-lg mt-4 shadow-md"
        />
        <p className="text-gray-600 mt-4">{item.description}</p>
        
        <div className="mt-4">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm font-medium">
            Category: {item.category}
          </span>
          <span className="ml-3 bg-green-100 text-green-800 px-2 py-1 rounded-lg text-sm font-medium">
            Location: {item.location}
          </span>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Barter Option</h2>
          <p className="text-gray-700">{item.barterOption}</p>
        </div>

        <div className="mt-6 p-4 border rounded-lg bg-gray-100 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">Owner Details</h2>
          <p className="text-gray-700"><strong>Name:</strong> {item.userId.name}</p>
          <p className="text-gray-700"><strong>Email:</strong> {item.userId.email}</p>
          <p className="text-gray-700"><strong>Contact:</strong> {item.userId.contact}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;


