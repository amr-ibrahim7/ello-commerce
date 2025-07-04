export interface brandType {
  _id: string;
  name: string;
  slug: string;
  customId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  image: {
    secure_url: string;
    public_id: string;
  };
}
