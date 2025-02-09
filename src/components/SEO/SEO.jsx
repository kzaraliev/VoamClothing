import React from "react";
import { Helmet } from "react-helmet-async";
export default function SEO({ title, description, type, imageSrc, url }) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageSrc} />
      <meta property="og:url" content={url} />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="twitter:image" content={imageSrc} />
      <meta property="twitter:url" content={url} />
      {/* End Twitter tags */}
    </Helmet>
  );
}
