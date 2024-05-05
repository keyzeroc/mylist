type Props = {
  link: string;
};

export default function LinkPreview({ link }: Props) {
  return <div className="fixed bottom-0 left-0">{link}</div>;
}
