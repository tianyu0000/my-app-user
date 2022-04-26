import React, { useState } from 'react';
import Order from '@/views/Order';
import FeedBack from '@/views/FeedBack';


const ValueDelivery: React.FC = () => {

  const [inputValue, setInpuValue] = useState<string>();
  const handleRes = () => {
    console.log();

  }

  return <div>
    <Order handleRes={handleRes} />
    {/* <FeedBack inputValue={inputValue!} /> */}
  </div>;
};

export default ValueDelivery;
