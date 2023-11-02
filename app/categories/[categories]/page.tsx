"use client";
import React, { useEffect, useState } from "react";
import Container from "@/app/Components/Common/Container";
import ProductCard from "@/app/Components/ProductCard/ProductCard";
import { IPrdoucts } from "@/app/page";
import { useGetProductByCategoryQuery } from "@/redux/Services/productService";
import { useParams } from "next/navigation";
import Spinner from "@/app/Components/Common/Spinner";

const ProductByCategory = () => {
  const { categories } = useParams();
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, refetch } = useGetProductByCategoryQuery({
    category: categories,
    page: pageNumber,
    pageSize: 10,
  });
  useEffect(() => {
    refetch();
  }, [refetch]);
  const handlePagination = (page: number) => {
    setPageNumber((perviousPage: number) => {
      return perviousPage + page;
    });
  };
  if (isLoading) {
    return <Spinner />;
  }
  const productData: IPrdoucts | null | any = data;
  return (
    <div>
      <Container>
        {productData?.products.length !== 0 ? (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3 items-center justify-center">
            {productData?.products?.map((product: any, index: number) => {
              const { laptopName, images, price, _id } = product;
              return (
                <div key={index + 1}>
                  <ProductCard
                    id={_id}
                    name={laptopName}
                    imageUrl={images[0]}
                    price={price}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center text-center mt-5">
            <p className="text-rose-500">No Product Found!</p>
          </div>
        )}
        <div className="join mt-10 flex justify-center">
          <div className="join grid grid-cols-2">
            <button
              disabled={pageNumber === 1}
              onClick={() => handlePagination(-1)}
              type="button"
              className={
                pageNumber === 1
                  ? "join-item btn btn-neutral"
                  : "join-item btn btn-outline"
              }
            >
              Previous page
            </button>
            <button
              onClick={() => handlePagination(+1)}
              type="button"
              className="join-item btn btn-outline"
            >
              Next
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductByCategory;
