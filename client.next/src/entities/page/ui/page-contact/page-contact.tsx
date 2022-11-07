import React from "react";
import type { PostProps } from "@/shared/types";
import { Heading } from "@/shared/ui/heading";
import { getFieldsRepeater } from "@/shared/lib/meta-fields";
import { useSettings } from "@/app/contexts/settings-context";
import { getPhoneFromString } from "@/shared/lib/string";
import { ImagePreview } from "@/shared/ui/image-preview";

export const PageContact = ({ title, preview, meta }: PostProps) => {
  const settings = useSettings();
  const phone = settings?.contacts?.phone;
  const fax = settings?.contacts?.fax;
  const email = settings?.contacts?.email;
  const fullAddress = settings?.contacts?.fullAddress;

  const additionalPhones = getFieldsRepeater(meta, "additional_phones");
  const correspondents = getFieldsRepeater(meta, "correspondents");

  return (
    <>
      {title && (
        <Heading className="text-grey-500 mb-5" tag="h1" title={title} />
      )}
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-[40%] lg:mr-5 p-8 bg-grey-100">
          {fullAddress && (
            <p>
              <strong>Адрес:</strong> {fullAddress}
            </p>
          )}
          {phone && (
            <p className="mt-5">
              <strong>Телефон:</strong>{" "}
              <a href={`tel:${getPhoneFromString(phone)}`}>{phone}</a>
            </p>
          )}
          {fax && (
            <p className="mt-5">
              <strong>Факс:</strong> {fax}
            </p>
          )}
          {email && (
            <p className="mt-5">
              <strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a>
            </p>
          )}
        </div>
        {preview?.url && (
          <div className="w-full lg:w-[60%] h-[270px] lg:min-h-[270px] flex">
            <ImagePreview url={preview?.url} />
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row text-grey-500">
        {additionalPhones && additionalPhones.length > 0 && (
          <div className="w-full lg:w-[40%] lg:mr-5 mt-8">
            <h3 className="mb-3">Дополнительные телефоны:</h3>
            <div className="divide-y divide-grey-200">
              {additionalPhones.map((item, index: number) => {
                const title = item[`additional_phones_${index}_title`];
                const phone = item[`additional_phones_${index}_phone`];
                return (
                  <div key={index} className="flex py-3 text-14px">
                    <div className="w-[50%] flex-shrink-0 pr-3">
                      <strong>{title}</strong>
                    </div>
                    <div>{phone}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {correspondents && correspondents.length > 0 && (
          <div className="w-full lg:w-[60%] mt-8">
            <h3 className="mb-3">Корреспонденты:</h3>
            <div className="divide-y divide-grey-200">
              {correspondents.map((item, index: number) => {
                const fullName = item[`correspondents_${index}_full_name`];
                const phone = item[`correspondents_${index}_phone`];
                const email = item[`correspondents_${index}_email`];

                return (
                  <div key={index} className="flex py-3 text-14px">
                    <div className="w-[50%] flex-shrink-0 pr-3">
                      <strong>{fullName}</strong>
                    </div>
                    <div>
                      <div>{phone}</div>
                      {email && (
                        <div>
                          <a href={`mailto:${email}`}>{email}</a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
