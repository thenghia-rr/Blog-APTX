import { useState } from "react";
import propTypes from "prop-types";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const CommentForm = ({
  initialText = "",
  formSubmitHandler,
  formCancelHandler,
  btnLabel,
  loading = false,
}) => {
  const { t } = useTranslation();
  const [valueText, setValueText] = useState(initialText);

  const submitHandler = (e) => {
    e.preventDefault();
    if (valueText.trim() == "") {
      toast.error("Vui lòng nhập nội dung bình luận...");
    } else {
      formSubmitHandler(valueText);
    }
    setValueText("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col items-end border border-primary rounded-lg p-4 dark:text-dark-soft">
        <textarea
          className="w-full focus:outline-none bg-transparent"
          rows="5"
          value={valueText}
          placeholder={t("placeholderCommentForm")}
          onChange={(e) => setValueText(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        />
        <div className="flex items-center gap-x-2 pt-2">
          {formCancelHandler && (
            <button
              type="button"
              className="px-6 py-2.5 rounded-lg border border-red-500 text-red-500"
              onClick={formCancelHandler}
            >
              {t("cancel")}
            </button>
          )}

          <button
            disabled={loading}
            type="submit"
            className="px-6 py-2.5 rounded-lg  bg-primary text-white font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {btnLabel}
          </button>
        </div>
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  initialText: propTypes.any,
  formSubmitHandler: propTypes.any,
  formCancelHandler: propTypes.any,
  btnLabel: propTypes.any,
  loading: propTypes.any,
};

export default CommentForm;
