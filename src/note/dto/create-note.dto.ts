export class CreateNoteDto {
  title: string;
  previewImageUrl?: string;
  tags: string[];
  description?: string;
  isLink: boolean;
  linkContent: string;
  content: string;
  spaceId: string;
  userId: number;
}
