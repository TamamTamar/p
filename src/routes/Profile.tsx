import { useForm } from "react-hook-form";
import { RegisterUser, updateUserType } from "../@types/types";
import patterns from "../validation/patterns";

import { ChangeEvent, useEffect, useState } from "react";
import { BsEye, BsEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import dialogs from "../ui/dialogs";
import "./CreateCard.scss";
import auth, { updateUser, userDetails } from "../services/auth";
import { jwtDecode } from "jwt-decode";



const mapToAllowedFields = (user: updateUserType) => ({
  name: {
    first: user.name.first,
    middle: user.name.middle,
    last: user.name.last
  }
  ,
  phone: user.phone,
  image: {
    url: user.image.url,
    alt: user.image.alt
  },
  address: {
    state: user.address.state,
    country: user.address.country,
    city: user.address.city,
    street: user.address.street,
    houseNumber: user.address.houseNumber,
    zip: user.address.zip
  }
});

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<updateUserType>();
  const { token } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<updateUserType>({} as updateUserType)

  useEffect(() => {
    setLoading(true)
    if (token) {
      const { _id } = jwtDecode(token) as any
      auth.userDetails(_id).then((res) => {
        const data = res.data;
        for (const key in data) {
          setValue(key as keyof updateUserType, data[key]);
        }
     
      }).finally(() => setLoading(false))
    }
    else {
      setLoading(false)
    }
  }, [token , id , setValue]) 
  

  const onUpdateUser = (data: updateUserType) => {
    const profileData = mapToAllowedFields(data);
    if (token) {
      const { _id } = jwtDecode(token) as any
    updateUser(_id ?? "", profileData)
    .then(() => {
      dialogs.success("Success", "Profile Updated")
      .then(() => {
        navigate("/");
      });
    }) .catch(err => {
      dialogs.error("Error", err.response.data);
      if (err.response) {
        console.error('API Error Response:', err.response.data); // Log error response
      }
    });
  }
    
  }

    return (
      <div className="create-card-container bg-blue-950  text-white dark:bg-slate-600">
        <form noValidate onSubmit={handleSubmit(onUpdateUser)}>
          {/* firstName */}
          <section>
            <input
            
              placeholder="First Name"
              type="text"
              {...register("name.first", {
                required: "This field is mandatory",
                minLength: { value: 2, message: "Too short" },
                maxLength: { value: 255, message: "Too long" },
              })}
            />
            {errors.name?.last && (
              <p className="text-red-500">{errors.name?.first?.message}</p>
            )}
          </section>
  
          {/* middle */}
          <section>
            <input
              placeholder="Middle Name"
              type="text"
              {...register("name.middle", {
                minLength: { value: 2, message: "Too short" },
                maxLength: { value: 255, message: "Too long" },
              })}
            />
            {errors.name?.middle && (
              <p className="text-red-500">{errors.name?.middle?.message}</p>
            )}
          </section>
  
          {/* last */}
          <section>
            <input
              placeholder="Last Name"
              type="text"
              {...register("name.last", {
                required: "This field is mandatory",
                minLength: { value: 2, message: "Too short" },
                maxLength: { value: 255, message: "Too long" },
              })}
            />
            {errors.name?.last && (
              <p className="text-red-500">{errors.name?.last?.message}</p>
            )}
          </section>
  
          {/* phone */}
          <section>
            <input
              placeholder="Phone"
              type="tel"
              {...register("phone", {
                required: "This field is mandatory",
                minLength: { value: 9, message: "Too short" },
                maxLength: { value: 14, message: "Too long" },
              })}
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone?.message}</p>
            )}
          </section>
  
          {/* image */}
          <section>
            <input
              placeholder="Image URL"
              type="url"
              {...register("image.url", {
                pattern: {
                  value: patterns.url,
                  message: "Invalid image URL",
                },

          })}
            />
            {errors.image?.url && (
              <p className="text-red-500">{errors.image?.url?.message}</p>
            )}
          </section>
  

          {/* address.state */}
          <section>
            <input
              placeholder="State"
              type="text"
              {...register("address.state", {
                minLength: { value: 2, message: "Too short" },
                maxLength: { value: 255, message: "Too long" },
              })}
            />
            {errors.address?.state && (
              <p className="text-red-500">{errors.address?.state?.message}</p>
            )}
          </section>
  
          {/* address.country */}
          <section>
            <input
              placeholder="Country"
              type="text"
              {...register("address.country", {
                required: "This field is mandatory",
                minLength: { value: 2, message: "Too short" },
                maxLength: { value: 255, message: "Too long" },
              })}
            />
            {errors.address?.country && (
              <p className="text-red-500">{errors.address?.country?.message}</p>
            )}
          </section>
  
          {/* address.city */}
          <section>
            <input
              placeholder="City"
              type="text"
              {...register("address.city", {
                required: "This field is mandatory",
                minLength: { value: 2, message: "Too short" },
                maxLength: { value: 255, message: "Too long" },
              })}
            />
            {errors.address?.city && (
              <p className="text-red-500">{errors.address?.city?.message}</p>
            )}
          </section>
  
          {/* address.street */}
          <section>
            <input
              placeholder="Street"
              type="text"
              {...register("address.street", {
                required: "This field is mandatory",
                minLength: { value: 2, message: "Too short" },
                maxLength: { value: 255, message: "Too long" },
              })}
            />
            {errors.address?.street && (
              <p className="text-red-500">{errors.address?.street?.message}</p>
            )}
          </section>
  
          {/* address.houseNumber */}
          <section>
            <input
              placeholder="House Number"
              type="number"
              {...register("address.houseNumber", {
                required: "This field is mandatory",
                min: { value: 2, message: "Too small" },
                max: { value: 256, message: "Too big" },
              })}
            />
            {errors.address?.houseNumber && (
              <p className="text-red-500">
                {errors.address?.houseNumber?.message}
              </p>
            )}
          </section>
  
          {/* address.zip */}
          <section>
            <input
              placeholder="Zip"
              type="number"
              {...register("address.zip", {
                required: "This field is mandatory",
                min: { value: 2, message: "Too small" },
                max: { value: 256, message: "Too big" },
              })}
            />
            {errors.address?.zip && (
              <p className="text-red-500">{errors.address?.zip?.message}</p>
            )}
          </section>
           
          <button type="submit">uptade user</button>
          
        </form>
      </div>
    );
};

export default Profile;
