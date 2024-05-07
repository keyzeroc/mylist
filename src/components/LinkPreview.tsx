type LinkPreviewProps = {
  link: string;
};

export default function LinkPreview({ link }: LinkPreviewProps) {
  return <div className="fixed bottom-0 left-0">{link}</div>;
}
